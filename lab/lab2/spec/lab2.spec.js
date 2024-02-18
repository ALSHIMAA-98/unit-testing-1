const User = require("../lab2");

describe("User", () => {
    let user1;

    beforeEach(() => {
        // Arrange
        user1 = new User("ahmed", 100);
    });

    describe("addToCart", () => {
        it("should add a product to the cart array", () => {
            // Act
            user1.addToCart({ name: "Product1", price: 50 });

            // Assert
            expect(user1.cart.length).toBe(1);
        });
    });

    describe("calculateTotalCartPrice", () => {
        it("should return total price of products in the cart", () => {
            // Arrange
            user1.addToCart({ name: "Product1", price: 50 });
            user1.addToCart({ name: "Product2", price: 30 });

            // Act
            const totalPrice = user1.calculateTotalCartPrice();

            // Assert
            expect(totalPrice).toBe(80);
        });
    });

    describe("checkout", () => {
        it("should call paymentModel methods and return true if the payment is verified", () => {
            // Arrange
            const paymentModel = {
                goToVerifyPage: jasmine.createSpy("goToVerifyPage"),
                returnBack: jasmine.createSpy("returnBack"),
                isVerify: jasmine.createSpy("isVerify").and.returnValue(true),
            };

            // Act
            const result = user1.checkout(paymentModel);

            // Assert
            expect(paymentModel.goToVerifyPage).toHaveBeenCalled();
            expect(paymentModel.returnBack).toHaveBeenCalled();
            expect(result).toBe(true);
        });
    });
});
