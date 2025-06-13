# Módulo de Invoice (Nota Fiscal)

Este módulo implementa o domínio de geração e consulta de notas fiscais utilizando os princípios de DDD, conforme proposto no desafio da **FullCycle**.

---

## Estrutura de Pastas

```
src/
├── domain/
│   ├── entity/
│   ├── value-object/
│   └── repository/
├── usecase/
│   ├── generate-invoice/
│   └── find-invoice/
├── facade/
├── factory/
└── infra/
    └── db/
        └── invoice-repository.memory.ts
tests/
```

---

## Entidades

### `Invoice`

* `id: string`
* `name: string`
* `document: string`
* `address: Address (Value Object)`
* `items: InvoiceItem[]`
* `createdAt: Date`
* `updatedAt: Date`

### `InvoiceItem`

* `id: string`
* `name: string`
* `price: number`

### `Address` (Value Object)

* `street: string`
* `number: string`
* `complement: string`
* `city: string`
* `state: string`
* `zipCode: string`

---

## Casos de Uso

### `GenerateInvoiceUseCase`

* Recebe dados do cliente e produtos
* Retorna nota fiscal com total calculado

### `FindInvoiceUseCase`

* Busca uma nota fiscal pelo `id`

---

## DTOs

### Entrada - Generate

```ts
interface GenerateInvoiceUseCaseInputDto {
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
}
```

### Saída - Generate

```ts
interface GenerateInvoiceUseCaseOutputDto {
  id: string;
  name: string;
  document: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  state: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  total: number;
}
```

---

## Testes

Para rodar os testes:

```bash
npm test
```

Cenários cobertos:

* Gerar nota fiscal com múltiplos produtos
* Buscar nota fiscal e validar total, dados do cliente e endereço

---

## Facade

A `InvoiceFacade` centraliza os casos de uso com uma interface simplificada:

```ts
const facade = InvoiceFacadeFactory.create();

const result = await facade.generate(input);
const invoice = await facade.find({ id: result.id });
```

---

## Executando Localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute os testes:

```bash
npm test
```

---
