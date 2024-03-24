import threading


class InMemoryDatabase:
    def __init__(self):
        self.__database = {}

    def create_owner(self):
        self.__database = {}

    def delete_owner(self):
        self.__database = {}

    def create_section(self):
        self.__database = {}

    def delete_section(self):
        self.__database = {}

    def create_section_field(self):
        self.__database = {}

    def delete_section_field(self):
        self.__database = {}