import Product from "./product";

describe("Product init tests", () => {
    it("should throw error when id is empty", () => {
        expect(() => {
            const product = new Product("", "Product 1", 100);
        }).toThrow("product: Id is required")
    });

    it("should throw error when name is empty", () => {
        expect(() => {
            const product = new Product("123", "", 100);
        }).toThrow("product: Name is required")
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("123", "Product 1", -1);
        }).toThrow("product: Price must be greater than zero")
    });

    it("should throw error when name, id, and price are empty", () => {
        expect(() => {
            const product = new Product("", "", -1);
        }).toThrow("product: Id is required,product: Name is required,product: Price must be greater than zero")
    });

    it("should change name", () => {
        const product = new Product("123", "Product 1", 100);
        product.changeName("Product 2");
        expect(product.name).toBe("Product 2");
    });

    it("should change price", () => {
        const product = new Product("123", "Product 1", 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    });
});