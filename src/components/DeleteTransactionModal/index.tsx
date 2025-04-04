import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, DeleteButton, ButtonContainer } from "./styles";
import { X, Trash } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";

interface DeleteTransactionModalProps {
    transactionId: number;
}

export function DeleteTransactionModal({ transactionId }: DeleteTransactionModalProps) {
    const deleteTransaction = useContextSelector(TransactionsContext, (context) => {
        return context.deleteTransaction
    });

    const handleDelete = () => {
        deleteTransaction(transactionId);
    };

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Excluir transação</Dialog.Title>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <p>
                    Tem certeza que deseja excluir esta transação?<br />
                    Esta ação não pode ser desfeita.
                </p>
                <ButtonContainer>
                    <DeleteButton onClick={handleDelete}>
                        <Trash size={20} />
                        Excluir transação
                    </DeleteButton>
                </ButtonContainer>
            </Content>
        </Dialog.Portal>
    );
} 