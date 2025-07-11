import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer init tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            let customer = new Customer("", "John");
        }).toThrow("customer: Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrow("customer: Name is required")
    });

    it("should throw error when name and id are empty", () => {
        expect(() => {
            let customer = new Customer("", "");
        }).toThrow("customer: Id is required,customer: Name is required")
    });

    it("should change name", () => {
        // Arrange
        let customer = new Customer("123", "John");

        // Act
        customer.changeName("Jane");

        // Assert
        expect(customer.name).toBe("Jane");
    });

    it("should activate customer", () => {
        let customer = new Customer("1", "Customer 1");
        const address = new Address("Street1", 123, "13330-250", "Goiânia");
        customer.changeAddress(address);

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined when you activate a customer", () => {
        expect(() => {
            let customer = new Customer("1", "Customer 1");
    
            customer.activate();
        }).toThrow("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {
        let customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});