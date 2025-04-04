import * as Dialog from "@radix-ui/react-dialog";
import { X } from "phosphor-react";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { Overlay, Content, CloseButton, ButtonContainer, DeleteButton } from "./styles";

export function DeleteAllTransactionsModal() {
    const clearTransactions = useContextSelector(TransactionsContext, (context) => {
        return context.clearTransactions;
    });

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title>Excluir todas as transações?</Dialog.Title>
                <Dialog.Description>
                    Tem certeza que deseja excluir todas as transações?
                    <br />
                    Esta ação não pode ser desfeita.
                </Dialog.Description>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <ButtonContainer>
                    <DeleteButton onClick={clearTransactions}>
                        Excluir transações
                    </DeleteButton>
                </ButtonContainer>
            </Content>
        </Dialog.Portal>
    );
} 