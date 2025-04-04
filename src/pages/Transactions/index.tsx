import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
  MonthSelector,
  MonthButton,
  DeleteButton,
  PaginationContainer,
  PaginationButton,
} from "./styles";
import { SearchForm } from "./components/SearchForm";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";
import { X, CaretLeft, CaretRight } from "phosphor-react";
import { useState, useMemo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { DeleteTransactionModal } from "../../components/DeleteTransactionModal";
import { Transaction } from "../../contexts/TransactionsContext";

const months = [
    { number: 1, name: 'Janeiro' },
    { number: 2, name: 'Fevereiro' },
    { number: 3, name: 'Março' },
    { number: 4, name: 'Abril' },
    { number: 5, name: 'Maio' },
    { number: 6, name: 'Junho' },
    { number: 7, name: 'Julho' },
    { number: 8, name: 'Agosto' },
    { number: 9, name: 'Setembro' },
    { number: 10, name: 'Outubro' },
    { number: 11, name: 'Novembro' },
    { number: 12, name: 'Dezembro' },
];

export function Transactions() {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);
  
  const { groupedTransactions, currentPage, setCurrentPage, itemsPerPage } = useContextSelector(TransactionsContext, (context) => {
    return {
      groupedTransactions: context.groupedTransactions,
      currentPage: context.currentPage,
      setCurrentPage: context.setCurrentPage,
      itemsPerPage: context.itemsPerPage
    }
  });

  const currentDate = useMemo(() => new Date(), []);
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const currentMonthKey = `${currentMonth}/${currentYear}`;

  if (!selectedMonth) {
    setSelectedMonth(currentMonthKey);
  }

  const getMonthName = (monthYear: string) => {
    const [month, year] = monthYear.split('/').map(Number);
    const monthObj = months.find(m => m.number === month);
    return `${monthObj?.name} ${year}`;
  };

  const getPaginatedTransactions = (transactions: Transaction[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (selectedMonth && groupedTransactions[selectedMonth]?.totalPages > currentPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <MonthSelector>
          {Object.keys(groupedTransactions).map(monthYear => (
            <MonthButton
              key={monthYear}
              onClick={() => {
                setSelectedMonth(monthYear);
                setCurrentPage(1);
              }}
              isSelected={selectedMonth === monthYear}
            >
              {getMonthName(monthYear)}
            </MonthButton>
          ))}
        </MonthSelector>
        <TransactionsTable>
          <tbody>
            {selectedMonth && getPaginatedTransactions(groupedTransactions[selectedMonth]?.transactions || []).map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                  <td>
                    <Dialog.Root>
                      <Dialog.Trigger asChild>
                        <DeleteButton>
                          <X size={20} />
                        </DeleteButton>
                      </Dialog.Trigger>
                      <DeleteTransactionModal transactionId={transaction.id} />
                    </Dialog.Root>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
        {selectedMonth && groupedTransactions[selectedMonth]?.totalPages > 1 && (
          <PaginationContainer>
            <PaginationButton onClick={handlePreviousPage} disabled={currentPage === 1}>
              <CaretLeft size={20} />
            </PaginationButton>
            <span>Página {currentPage} de {groupedTransactions[selectedMonth]?.totalPages}</span>
            <PaginationButton 
              onClick={handleNextPage} 
              disabled={currentPage === groupedTransactions[selectedMonth]?.totalPages}
            >
              <CaretRight size={20} />
            </PaginationButton>
          </PaginationContainer>
        )}
      </TransactionsContainer>
    </div>
  );
}
