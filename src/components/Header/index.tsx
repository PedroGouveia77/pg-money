import { HeaderContainer, HeaderContent, NewTransactionButton, DeleteAllButton, ButtonsContainer } from "./styles";
import * as Dialog from "@radix-ui/react-dialog";
import { NewTransactionModal } from "../NewTransactionModal";
import { DeleteAllTransactionsModal } from "../DeleteAllTransactionsModal";
import logoImg from "../../assets/logo.svg";

export function Header() {
    return (
            <HeaderContainer>
                <HeaderContent>
                    <img src={logoImg} alt="" />
                    <ButtonsContainer>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <NewTransactionButton>Nova transação</NewTransactionButton>
                            </Dialog.Trigger>
                            <NewTransactionModal />
                        </Dialog.Root>
                        <Dialog.Root>
                            <Dialog.Trigger asChild>
                                <DeleteAllButton>Excluir transações</DeleteAllButton>
                            </Dialog.Trigger>
                            <DeleteAllTransactionsModal />
                        </Dialog.Root>
                    </ButtonsContainer>
                </HeaderContent>
            </HeaderContainer>
    )
}
