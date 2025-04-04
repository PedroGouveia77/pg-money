import { createContext as createContextSelector } from "use-context-selector";
import { useEffect, useState, useCallback } from "react";

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

export interface Transaction {
    id: number;
    description: string;
    price: number;
    type: "income" | "outcome";
    category: string;
    createdAt: string;
}

interface GroupedTransactions {
    [key: string]: {
        transactions: Transaction[];
        totalPages: number;
    };
}

interface TransactionContextType {
    transactions: Transaction[]
    groupedTransactions: GroupedTransactions
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
    deleteTransaction: (id: number) => void
    clearTransactions: () => void
    currentPage: number
    setCurrentPage: (page: number) => void
    itemsPerPage: number
}

interface TransactionProviderProps {
    children: React.ReactNode
}

const STORAGE_KEY = '@pg-money:transactions';
const ITEMS_PER_PAGE = 5;

export const TransactionsContext = createContextSelector<TransactionContextType>({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        return storedTransactions ? JSON.parse(storedTransactions) : [];
    });

    const [groupedTransactions, setGroupedTransactions] = useState<GroupedTransactions>({});
    const [currentPage, setCurrentPage] = useState(1);

    const groupTransactionsByMonth = useCallback((transactions: Transaction[]) => {
        const grouped: GroupedTransactions = {};
        
        transactions.forEach(transaction => {
            const date = new Date(transaction.createdAt);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            
            if (!grouped[monthYear]) {
                grouped[monthYear] = {
                    transactions: [],
                    totalPages: 1
                };
            }
            
            grouped[monthYear].transactions.push(transaction);
        });

        Object.keys(grouped).forEach(monthYear => {
            const totalTransactions = grouped[monthYear].transactions.length;
            grouped[monthYear].totalPages = Math.ceil(totalTransactions / ITEMS_PER_PAGE);
        });

        Object.keys(grouped).forEach(monthYear => {
            grouped[monthYear].transactions.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
        });
        
        const sortedGrouped: GroupedTransactions = {};
        Object.keys(grouped)
            .sort((a, b) => {
                const [monthA, yearA] = a.split('/').map(Number);
                const [monthB, yearB] = b.split('/').map(Number);
                return yearB - yearA || monthB - monthA;
            })
            .forEach(key => {
                sortedGrouped[key] = grouped[key];
            });

        return sortedGrouped;
    }, []);

    const fetchTransactions = useCallback(async (query?: string) => {
        let filteredTransactions = transactions;
        
        if (query) {
            filteredTransactions = transactions.filter(transaction => 
                transaction.description.toLowerCase().includes(query.toLowerCase()) ||
                transaction.category.toLowerCase().includes(query.toLowerCase())
            );
        }

        setTransactions(filteredTransactions);
        setGroupedTransactions(groupTransactionsByMonth(filteredTransactions));
    }, [transactions, groupTransactionsByMonth]);

    const createTransaction = useCallback(async (data: CreateTransactionInput) => {
        const { description, price, category, type } = data;
        const newTransaction = {
            id: Math.random(),
            description,
            price,
            category,
            type,
            createdAt: new Date().toISOString(),
        };

        const updatedTransactions = [newTransaction, ...transactions];
        setTransactions(updatedTransactions);
        setGroupedTransactions(groupTransactionsByMonth(updatedTransactions));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    }, [transactions, groupTransactionsByMonth]);

    const deleteTransaction = useCallback((id: number) => {
        const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
        setTransactions(updatedTransactions);
        setGroupedTransactions(groupTransactionsByMonth(updatedTransactions));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    }, [transactions, groupTransactionsByMonth]);

    const clearTransactions = useCallback(() => {
        setTransactions([]);
        setGroupedTransactions({});
        localStorage.removeItem(STORAGE_KEY);
    }, []);

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ 
            transactions, 
            groupedTransactions,
            fetchTransactions, 
            createTransaction,
            deleteTransaction,
            clearTransactions,
            currentPage,
            setCurrentPage,
            itemsPerPage: ITEMS_PER_PAGE
        }}>
            {children}
        </TransactionsContext.Provider>
    );
}

