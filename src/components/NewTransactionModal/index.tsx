import * as Dialog from "@radix-ui/react-dialog";
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton, CategoryContainer, CategoryDropdownButton, SelectStyles } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X, CaretDown } from "phosphor-react";
import * as z from 'zod'
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import * as Select from '@radix-ui/react-select';

const categories = [
  "Alimentação",
  "Transporte",
  "Moradia",
  "Lazer",
  "Saúde",
  "Educação",
  "Compras",
  "Outros"
];

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(TransactionsContext, (context) => {
    return context.createTransaction
  })
    const { control, register, handleSubmit, formState: { isSubmitting }, reset, setValue } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
        defaultValues: {
            type: 'income',
        }
    })

    async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
      const { description, price, category, type } = data;

      await createTransaction({
        description,
        price,
        category,
        type,
      })

      reset();
    }

    const handleSelectCategory = (value: string) => {
      setValue('category', value);
    };

  return (
    <Dialog.Portal>
      <SelectStyles />
      <Overlay />
      <Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <CloseButton>
            <X size={24} />
        </CloseButton>
        
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input type="text" placeholder="Descrição" required {...register('description')}  />
            <input type="number" placeholder="Preço" required {...register('price', { valueAsNumber: true })} />
            
            <CategoryContainer>
              <input 
                type="text" 
                placeholder="Categoria" 
                required 
                {...register('category')} 
              />
              <Select.Root onValueChange={handleSelectCategory}>
                <Select.Trigger asChild>
                  <CategoryDropdownButton type="button">
                    <CaretDown size={24} />
                  </CategoryDropdownButton>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content className="SelectContent" position="popper" sideOffset={5}>
                    <Select.Viewport className="SelectViewport">
                      {categories.map((category) => (
                        <Select.Item key={category} value={category} className="SelectItem">
                          <Select.ItemText>{category}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
            </CategoryContainer>
            
            <Controller 
              control={control}
              name="type"
              render={({ field }) => {
                return (
                  <TransactionType onValueChange={field.onChange} value={field.value}>
                    <TransactionTypeButton variant="income" value="income">
                        <ArrowCircleUp size={24} />
                        Entrada
                    </TransactionTypeButton>
                    <TransactionTypeButton variant="outcome" value="outcome">
                        <ArrowCircleDown size={24} />
                        Saída
                    </TransactionTypeButton>
                  </TransactionType>
                )
              }}
            />

            <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
