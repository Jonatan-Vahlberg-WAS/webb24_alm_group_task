const { User } = require("../test-setup");

describe("User Model", () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com" })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
  });

  it("should validate email format", async () => {
    // Build: Create a new user instance without saving it to the database
    const user = User.build({ username: "testuser", email: "invalid-email" });
    // Validate: Check if the user instance is valid
    // rejects.toThrow() is used to check if the user instance is invalid
    expect(user.validate()).rejects.toThrow();
  });

  it("should enforce unique email constraint", async () => {
    // Create first user
    await User.create({ username: "user1", email: "test@test.com" });
    
    // Try to create second user with same email
    await expect(
      User.create({ username: "user2", email: "test@test.com" })
    ).rejects.toThrow();
  });

  it("should enforce unique username constraint", async () => {
    // Create first user
    await User.create({ username: "testuser", email: "test1@test.com" });
    
    // Try to create second user with same username
    await expect(
      User.create({ username: "testuser", email: "test2@test.com" })
    ).rejects.toThrow();
  });

  it("should validate profile picture URL", async () => {
    // Test with invalid URL
    const userWithInvalidUrl = User.build({
      username: "testuser",
      email: "test@test.com",
      profilePicture: "not-a-url"
    });
    await expect(userWithInvalidUrl.validate()).rejects.toThrow();

    // Test with valid URL
    const userWithValidUrl = User.build({
      username: "testuser2",
      email: "test2@test.com",
      profilePicture: "https://example.com/profile.jpg"
    });
    await expect(userWithValidUrl.validate()).resolves.not.toThrow();
  });
});

