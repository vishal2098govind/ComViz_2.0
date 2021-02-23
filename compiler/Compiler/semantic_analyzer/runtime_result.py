class RuntimeResult:
    def __init__(self):
        self.value = None
        self.error = None

    def register(self, runtime_result):
        if runtime_result.error:
            self.error = runtime_result.error
        return runtime_result.value

    def success(self, value):
        self.value = value
        return self

    def failure(self, error):
        self.error = error
        return self
