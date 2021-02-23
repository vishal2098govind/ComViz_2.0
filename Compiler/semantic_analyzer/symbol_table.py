class SymbolTable:
    def __init__(self):
        self.symbols_map = {
            "var": [],
            "var_value": []
        }

    def get_var_value(self, var_name):
        value = self.symbols_map["var_value"][self.symbols_map["var"].index(var_name)]

        return value

    def set_var_value(self, var_name, new_var_value):
        if var_name not in self.symbols_map["var"]:
            self.symbols_map["var"].append(var_name)
            self.symbols_map["var_value"].append(new_var_value)

        else:
            self.symbols_map["var_value"][self.symbols_map["var"].index(var_name)] = new_var_value\


    def remove_var_entry(self, var_name):
        del self.symbols_map[var_name]

    def __repr__(self):
        return f'{self.symbols_map}'
