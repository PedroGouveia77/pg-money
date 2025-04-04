import { styled } from "styled-components";

export const TransactionsContainer = styled.main`
    width: 100%;
    max-width: 1120px;
    margin: 4rem auto 0;
    padding: 0 1.5rem;
`;

export const TransactionsTable = styled.table`
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 0.5rem;
    margin-top: 1.5rem;

    td {
        padding: 1.25rem 2rem;
        background: ${props => props.theme['gray-700']};

        &:first-child {
            border-top-left-radius: 6px;
            border-bottom-left-radius: 6px;

            &:last-child {
                border-top-right-radius: 6px;
                border-bottom-right-radius: 6px;
            }
        }
    }
`;

interface PriceHighlightProps {
    variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
    color: ${props => props.variant === 'income' ? props.theme['green-300'] : props.theme['red-300']};
    display: flex;
    align-items: center;
    white-space: nowrap;
`;

export const MonthSelector = styled.div`
    display: flex;
    gap: 0.5rem;
    margin-top: 1.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
`;

interface MonthButtonProps {
    isSelected: boolean;
}

export const MonthButton = styled.button<MonthButtonProps>`
    padding: 0.5rem 1rem;
    border: 0;
    border-radius: 6px;
    background: ${props => props.isSelected ? props.theme['green-500'] : props.theme['gray-600']};
    color: ${props => props.theme.white};
    cursor: pointer;
    transition: background-color 0.2s;
    outline: none;

    &:hover {
        background: ${props => props.isSelected ? props.theme['green-700'] : props.theme['gray-500']};
    }

    &:focus {
        box-shadow: none;
    }
`;

export const DeleteButton = styled.button`
    background: transparent;
    border: 0;
    color: ${props => props.theme['gray-500']};
    cursor: pointer;
    line-height: 0;
    border-radius: 2px;

    &:hover {
        color: ${props => props.theme['red-500']};
    }
`;

export const PaginationContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
`;

export const PaginationButton = styled.button`
    background: transparent;
    border: 0;
    color: ${props => props.theme['gray-500']};
    cursor: pointer;
    line-height: 0;
    border-radius: 2px;

    &:hover {
        color: ${props => props.theme['green-500']};
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;

