const sequelize = require("../../src/config/database")
const { User } = require("../test-setup");

describe("User Model", () => {
  beforeEach(async () => {
    await User.sync({force: true})
  }); 
  
  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com" })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should validate email format", async () => {
    const user = User.build({ username: "testuser", email: "invalid-email" });
    await expect(user.validate()).rejects.toThrow()
  });

  it("should enforce unique email", async () => {
    await User.create({username: "testuser", email: "test@test.com"})
    await expect (
      User.create({username: "testuser2", email: "test@test.com"})
    ).rejects.toThrow()
  });

  it("should enforce unique username", async () => {
    await User.create({username: "testuser", email: "test@test.com"})
    await expect (
      User.create({username: "testuser", email: "test2@test.com"})
    ).rejects.toThrow()
  });

  it("should validate profileImage as a valid URL", async () => {
    const user = User.build({
      username: "testuser",
      email: "test@test.com",
      profileImage: "not-a-valid-URL"
    })

    await expect(user.validate()).rejects.toThrow()
  });
  
});

