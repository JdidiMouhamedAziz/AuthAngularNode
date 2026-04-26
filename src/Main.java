import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner=new Scanner(System.in);

        double principal;
        double rate;
        int timesCompoundes;
        int years;
        double amount;

        System.out.print("Enter the principal amout: ");
        principal=scanner.nextDouble();

        System.out.print("Enter the interest rate (in %): ");
        rate=scanner.nextDouble()/100;

        System.out.print("Enter the # of times compounded per year; ");
        timesCompoundes=scanner.nextInt();

        System.out.print("enter the # of years: ");
        years= scanner.nextInt();

        amount=principal*Math.pow(1+rate/timesCompoundes,timesCompoundes*years);

        System.out.printf("the amount after %d years is $%.2f",years,amount);
        scanner.close();
    }
}