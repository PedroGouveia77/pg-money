import { createContext as createContextSelector } from "use-context-selector";
import { useEffect, useState, useCallback } from "react";

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: "income" | "outcome";
}

interface Transaction {
    id: number;
    description: string;
    price: number;
    type: "income" | "outcome";
    category: string;
    createdAt: string;
}

interface TransactionContextType {
    transactions: Transaction[]
    fetchTransactions: (query?: string) => Promise<void>
    createTransaction: (data: CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps {
    children: React.ReactNode
}

const STORAGE_KEY = '@pg-money:transactions';

export const TransactionsContext = createContextSelector<TransactionContextType>({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>(() => {
        const storedTransactions = localStorage.getItem(STORAGE_KEY);
        return storedTransactions ? JSON.parse(storedTransactions) : [];
    });

    const fetchTransactions = useCallback(async (query?: string) => {
        let filteredTransactions = transactions;
        
        if (query) {
            filteredTransactions = transactions.filter(transaction => 
                transaction.description.toLowerCase().includes(query.toLowerCase()) ||
                transaction.category.toLowerCase().includes(query.toLowerCase())
            );
        }

        setTransactions(filteredTransactions);
    }, [transactions]);

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
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTransactions));
    }, [transactions]);

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
}

