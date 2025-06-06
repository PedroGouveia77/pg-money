import { styled } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme["gray-800"]};
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    p {
        margin-top: 1rem;
        color: ${props => props.theme["gray-300"]};
    }
`;

export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: ${props => props.theme["gray-500"]};
`;

export const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
`;

export const DeleteButton = styled.button`
    width: 100%;
    height: 58px;
    border: 0;
    background: ${props => props.theme["red-500"]};
    color: ${props => props.theme.white};
    font-weight: bold;
    padding: 0 1.25rem;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    &:hover {
        background: ${props => props.theme["red-700"]};
        transition: background-color 0.2s;
    }
`; 