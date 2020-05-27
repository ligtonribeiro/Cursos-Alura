class Conta:
    def __init__(self, numero, titular, saldo, limite):
        self.numero = numero
        self.titular = titular
        self.saldo = saldo
        self.limite = limite


    def extrato(self):
        print("Saldo de {} do titular {}".format(self.saldo, self.titular))


    def depositar(self, valor):
        self.saldo += valor


    def sacar(self, valor):
        self.saldo -= valor


conta = Conta(123, "Wellington", 55.0, 1000.0)
conta.extrato()
conta.depositar(100.0)
conta.extrato()
conta.sacar(30.0)
conta.extrato()

