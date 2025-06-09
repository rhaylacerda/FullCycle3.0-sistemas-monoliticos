import { InvoiceFacadeFactory } from "../factory/invoice-facade.factory";

describe("InvoiceFacade", () => {
  it("should generate and find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input = {
      name: "Joana",
      document: "12345678911",
      street: "Rua 7",
      number: "0",
      complement: "Ap 1",
      city: "SP",
      state: "SP",
      zipCode: "17201-000",
      items: [
        { id: "1", name: "Produto 1", price: 100 },
        { id: "2", name: "Produto 2", price: 200 }
      ]
    };

    const output = await facade.generate(input);

    expect(output.total).toBe(300);

    const invoice = await facade.find({ id: output.id });
    expect(invoice.name).toBe("Joana");
    expect(invoice.items.length).toBe(2);
  });
});
