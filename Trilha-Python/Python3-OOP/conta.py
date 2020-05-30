class Conta:
    def __init__(self, numero, titular, saldo, limite):
        self.__numero = numero
        self.__titular = titular
        self.__saldo = saldo
        self.__limite = limite

    def extrato(self):
        print("Saldo de {} do titular {}".format(self.__saldo, self.__titular))

    def depositar(self, valor):
        self.__saldo += valor

    def sacar(self, valor):
        self.__saldo -= valor

    def transferir(self, valor, destino):
        self.sacar(valor)
        destino.depositar(valor)

    def get_saldo(self):
        return print(self.__saldo)

    def get_titular(self):
        return print(self.__titular)

    def get_limite(self):
        return print(self.__limite)

    def set_limite(self, limite):
        self.__limite = limite


conta1 = Conta(123, "Wellinton", 55.0, 1000.0)
conta1.set_limite(10000)
conta1.get_limite()
