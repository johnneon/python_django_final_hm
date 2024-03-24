
class InMemoryDatabase:
    def __init__(self):
        self.__database = {
            'johnneon': {},
            'test': {},
        }

    def create_owner(self, login: str) -> bool:
        if login in self.__database:
            return False

        self.__database[login] = {}
        return True

    def delete_owner(self, login: str) -> bool:
        if login in self.__database:
            self.__database.pop(login)
            return True

        return False

    def create_section(self, user: str, section_name: str) -> dict:
        self.__database[user][section_name] = {}
        return self.__database[user]

    def delete_section(self, user: str, section_name: str) -> dict:
        self.__database[user].pop(section_name)
        return self.__database[user]

    def create_section_field(self, user: str, section_name: str, login: str, password: str) -> dict:
        self.__database[user][section_name][login] = password
        return self.__database[user]

    def delete_section_field(self, user: str, section_name: str, login: str):
        self.__database[user][section_name].pop(login)
        return self.__database[user]

    def get_users(self) -> list:
        return list(self.__database.keys())

    def get(self, user: str) -> dict:
        return self.__database[user]
