import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer("123", "John Doe");
const address = new Address("Street", 123, "Zip", "City");
customer.changeAddress(address);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe("Test find customer use case", () => {
    it("should find a customer", async () => {
        const customerRepository = MockRepository();
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        const output = {
            id: "123",
            name: "John Doe",
            address: {
                street: "Street",
                city: "City",
                number: 123,
                zip: "Zip"
            }
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
    });

    it("should not find a customer", async () => {
        const customerRepository = MockRepository();
        customerRepository.find.mockImplementation(() => {
            throw new Error("Customer not found");
        });
        const usecase = new FindCustomerUseCase(customerRepository);

        const input = {
            id: "123",
        };

        expect(usecase.execute(input)).rejects.toThrow("Customer not found");
    });
});