import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const productA = ProductFactory.create(
    "a",
    "Product A",
    100
);

const productB = ProductFactory.create(
    "b",
    "Product B",
    200
);

const MockRepository = () => {
    return {
        create: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
        find: jest.fn(),
        update: jest.fn(),
    };
};

describe('Unit test list product use case', () => {
    it('should list products', async () => {
        const productRepository = MockRepository();
        const listProductUseCase = new ListProductUseCase(productRepository);
        const output = await listProductUseCase.execute({});

        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(productA.id);
        expect(output.products[0].name).toBe(productA.name);
        expect(output.products[0].price).toBe(productA.price);
        expect(output.products[1].id).toBe(productB.id);
        expect(output.products[1].name).toBe(productB.name);
        expect(output.products[1].price).toBe(productB.price);
    });
});