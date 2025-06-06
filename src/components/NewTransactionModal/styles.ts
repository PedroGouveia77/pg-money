import { styled, createGlobalStyle } from "styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";

export const SelectStyles = createGlobalStyle`
    .SelectContent {
        background: ${props => props.theme["gray-900"]};
        border-radius: 6px;
        border: 0;
        padding: 0.5rem;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        animation: slideUpAndFade 0.4s ease-out;
        min-width: 220px;
        z-index: 9999;
    }

    .SelectViewport {
        padding: 0.25rem;
    }

    .SelectItem {
        padding: 0.75rem 1rem;
        color: ${props => props.theme["gray-300"]};
        cursor: pointer;
        user-select: none;
        display: flex;
        align-items: center;
        border-radius: 4px;
        outline: none;
        font-size: 1rem;
        line-height: 1;

        &:hover, &[data-highlighted] {
            background: ${props => props.theme["gray-700"]};
            color: ${props => props.theme.white};
        }

        & + & {
            margin-top: 0.25rem;
        }
    }

    @keyframes slideUpAndFade {
        from {
            opacity: 0;
            transform: translateY(2px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

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

    form {
        margin-top: 2rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        input {
            border-radius: 6px;
            border: 0;
            background: ${props => props.theme["gray-900"]};
            color: ${props => props.theme["gray-300"]};
            padding: 1rem;

            &::placeholder {
                color: ${props => props.theme["gray-500"]};
            }
        }

        button[type="submit"] {
            height: 58px;
            border: 0;
            background: ${props => props.theme["green-500"]};
            color: ${props => props.theme.white};
            font-weight: bold;
            padding: 0 1.25rem;
            border-radius: 6px;
            margin-top: 1.5rem;
            cursor: pointer;

            &:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }

            &:not(:disabled):hover {
                background: ${props => props.theme["green-700"]};
                transition: background-color 0.2s;
            }
        }
    }
`;

export const CategoryContainer = styled.div`
    display: flex;
    gap: 0.5rem;
    align-items: center;

    input {
        flex: 1;
    }
`;

export const CategoryDropdownButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: ${props => props.theme["gray-900"]};
    color: ${props => props.theme["gray-300"]};
    border: 0;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background: ${props => props.theme["gray-700"]};
    }
`;

export const TransactionType = styled(RadioGroup.Root)`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    margin-top: 0.5rem;
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

interface TransactionTypeButtonProps {
    variant: "income" | "outcome";
}

export const TransactionTypeButton = styled(RadioGroup.Item)<TransactionTypeButtonProps>`
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    background: ${props => props.theme["gray-700"]};
    color: ${props => props.theme["gray-300"]};

    svg {
        color: ${props => props.variant === "income" ? props.theme["green-300"] : props.theme["red-300"]};
    }

    &[data-state="unchecked"]:hover {
        background: ${props => props.theme["gray-600"]};
        transition: background-color 0.2s;
    }

    &[data-state="checked"] {
        color: ${props => props.theme.white};
        background: ${props => props.variant === "income" ? props.theme["green-500"] : props.theme["red-500"]};

        svg {
            color: ${props => props.theme.white};
        }
    }
`;