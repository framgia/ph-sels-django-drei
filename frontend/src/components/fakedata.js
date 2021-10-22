import faker from "faker";

const generateUsers = () => {
  let users = [];

  for (let id = 1; id <= 100; id++) {
    let firstName = faker.name.firstName();
    let lastName = faker.name.lastName();
    let email = faker.internet.email();
    let avatar = faker.image.avatar();

    users.push({
      id: id,
      first_name: firstName,
      last_name: lastName,
      avatar: avatar,
    });
  }

  return { students: users };
};

export default generateUsers;
