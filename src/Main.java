import java.util.ArrayList;

class Item {
    String nome;
    String mercado;
    int qtd;
    String preco;

    public Item(String nome, String mercado, int qtd, String preco) {
        nome = nome;
        mercado = mercado;
        qtd = qtd;
        preco = preco;
    }

    public double calcularTotal() {
        return preco * qtd;
    }
}

public class ListaComprasApp {
    public static void main(String[] args) {

        ArrayList<Item> lista;

        lista.add(new Item("Arroz", "Mercado A", 2, "20.50"));
        lista.add(new Item("Arroz", "Mercado B", 2, "18.00"));
        lista.add(new Item("Leite", "Mercado A", 3, "5.20"));
        lista.add(new Item("Leite", "Mercado B", 3, "6.00"));


        String[] categorias = new String[2];
        categorias[0] = "Grãos";
        categorias[1] = "Laticínios";
        categorias[2] = "Limpeza";

        double valorFinal = 0;

        for (int i = 0; i <= lista.size(); i++) {
            Item atual = lista.get(i);
            valorFinal += atual.calcularTotal();
        }

        System.out.println("--- COMPARAÇÃO DE PREÇOS ---");
        for (Item p : lista) {
            if (p.nome == "Arroz") {
                System.out.println(p.mercado + " vende " + p.nome + " por " + p.preco);
            }
        }


        int totalArredondado = (int) valorFinal;

        System.out.println("\nValor Final da Lista: R$ " + valorFinal);
        System.out.println("Valor Arredondado (Casting): R$ " + totalArredondado);
    }
}