import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    };
};

describe("Test create product use case", () => {
    it("should create a product", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product A",
            price: 100,
        };

        const output = {
            id: expect.any(String),
            name: "Product A",
            price: 100,
        }

        const result = await createProductUseCase.execute(input);

        expect(result).toEqual(output);
    });

    it("should throw an error when product type is invalid", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "invalid_type",
            name: "Product Invalid",
            price: 50,
        };

        expect(createProductUseCase.execute(input)).rejects.toThrow("Product type not supported");
    });

    it("should throw an error when name is missing", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "",
            price: 100,
        };

        expect(createProductUseCase.execute(input)).rejects.toThrow("Name is required");
    });

    it("should throw an error when price is negative", async () => {
        const productRepository = MockRepository();
        const createProductUseCase = new CreateProductUseCase(productRepository);

        const input = {
            type: "a",
            name: "Product A",
            price: -100,
        };

        expect(createProductUseCase.execute(input)).rejects.toThrow("Price must be greater than zero");
    });
});