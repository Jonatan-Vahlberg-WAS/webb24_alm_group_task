const { Accommodation, User} = require("../test-setup.js");


describe("Accommodation tests", () => {
    // it("Should delete accommodation when user is deleted", async () => {
    //     const user = await User.create({
    //         username: "TestUser1",
    //         email: "testUser1@mail.com",
    //     });

    //     await Accommodation.create({
    //         adress: "Storängsvägen 22",
    //         city: "Stockholm",
    //         country: "Sverige",
    //         zipcode: 12345,
    //         rent: 167999,
    //         room: 5,
    //         userId: user.id,
    //     });

    //     const found = await Accommodation.findOne({ where: { userId: user.id } });
    //     expect(found).toBeDefined();
       
    //     await user.destroy();

    //     const gone = await Accommodation.findOne({ where: { userId: user.id } });
    //     expect(gone).toBeNull();
    // });
    it("should create an accommodation", async () => {
        const user = await User.create({
          username: "testuser",
          email: "test@example.com",
        });
      
        const accommodation = await Accommodation.create({
          street: "shobaliba",       
          city: "Test City",
          country: "Test Country",
          postalCode: 12345,        
          rent: 1000,
          room: 3,
          userId: user.id,
        });

        console.log("user:::::::", user); // Ensure this line is executed
        expect(user).toBeDefined();
        expect(accommodation).toBeDefined();
    });
      
});
