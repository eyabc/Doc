# 이터레이터 패턴
컬렉션 구현 방법을 노출시키지 않으면서, 
그 집합체 안에 들어있는 모든 항목에 접근할 수 있는 방법

- 항목에 접근하는 방법은 반복자 객체에서 맞게 된다.
- 집합체는 반복작업에서 손을 떼고 객체 컬렉션 관리에서 전념할 수 있다.

- 어떤 집합체에 대해서도 사용할 수 있는 다형적인 코드를 만들 수 있다.

## 예시
두개의 서로다른 식당이있고 각각의 식당에서 메뉴를 구현한다고 가정해보자.

```java
public class MenuItem {
    String name;
    String description;
    String vegetarian;
    double price;

    public MenuItem(String name, String description, boolean vegetarian, double price){
        this.name = name;
        this.description = description;
        this.vegetarian = vegetarian;
        this.price = price;
    }
    public String getName() {
        return name;
    }
    public String getDescription() {
        return description;
    }
    public double getPrice() {
        return price;
    }
    public boolean isVegetarian() {
        return vegetarian;
    }
}
```
```java
public class PancakeHouseMenu {
    ArrayList<MenuItem> menuItems;

    public PancakeHouseMenu() {
        this.menuItems = new ArrayList();
        additem("K&B 팬케이크 세트","스크램블드 에그와 토스트가 곁들여진 펜케이크",true,2.99);
        additem("레귤러 팬케이크 세트","달걀 후라이와 소시지가 곁들여진 펜케이크",false,2.99);
        additem("블루베리 펜케이크","신선한 블루베리와 블루베리 시럽으로 만든 펜케이크",true,3.49);
        additem("와플","와플, 취향에 따라 블루베리나 딸기를 얹을 수 있습니다.",true,3.59);
    }
    public void additem(string name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        menuItem.add(menuItem);
    }
    public ArrayList<MenuItem> getMenuItems() {
        return menuItems;
    }
    //기타 메소드
}
```
```java
public class DinerMenu {
    static final int MAX_ITEMS = 6;
    int numberOfItems = 0;
    MenuItem[] menuItems;

    public DinerMenu() {
        this.menuItems = new MenuItem[MAX_ITEMS];
        additem("채식주의자용 BLT","통밀 위에 (식물성)베이컨, 상추, 토마토를 얹은 메뉴",true,2.99);
        additem("BLT","통밀 위에 베이컨, 상추, 토마토를 얹은 메뉴",false,2.99);
        additem("오늘의 스프","감자 샐러드를 곁들인 오늘의 스프",false,3.29);
        additem("핫도그","사워크라우트, 갖은 양념, 양파, 치즈가 곁들여진 핫도그",false,3.05);
    }
    public void additem(string name, String description, boolean vegetarian, double price) {
        MenuItem menuItem = new MenuItem(name, description, vegetarian, price);
        if(nemberOfItems >= MAX_ITEMS){
            System.err.println("죄송합니다, 메뉴가 꽉 찼습니다. 더 이상 추가할 수 없습니다.");
        } else {
            menuItems[numberOfItems] = menuItem;
            numberOfItems = numberOfItems+1;
        }
    }
    public MenuItem[] getMenuItems() {
        return menuItems;
    }
    //기타 메소드
}
```
각 메뉴의 모든 항목 출력
```java
PancakeHouseMenu pancakeHouseMenu = new PancakeHouseMenu();
ArrayList<MenuItem> breakfastItems = pancakeHouseMenu.getMenuItems();

DinerMenu dinerMenu = new DinerMenu();
MenuItem[] lunchItems = dinerMenu.getMenuItems();

for (int i=0; i < breakfaseItems.size(); i++) {
    MenuItem menuItem = breakfastItems.get(i);
    System.out.println(menuItem.getName());
    System.out.println(menuItem.getPrice());
    System.out.println(menuItem.getDescription());
}
for (int i=0; i < lunchItems.length; i++) {
    MenuItem menuItem = lunchItems[i];
    System.out.println(menuItem.getName());
    System.out.println(menuItem.getPrice());
    System.out.println(menuItem.getDescription());
}
```

위와 같이 두가지 서로 다른 메뉴 표현 방식이 있을 때 어떤문제가 생길 수 있을까.     

![image](https://user-images.githubusercontent.com/31977543/89864164-70d21a80-dbe6-11ea-9962-564b23ee5152.png)
내가 이해한 그림이다. 
Pancake 메뉴와 Diner 메뉴에는 순회하는 메서드가 없기 때문에 for 문을 사용하여 볼 수 있다.


반복적인 작업을 캡슐화한 Iterator 라는 객체를 만들어보자.

```java
Iterator<MenuItem> iterator = breakfastMenu.createIterator();
while (iterator.hasNext()) {
    MenuItem menuItem = iterator.next();
}

Iterator<MenuItem> iterator2 = lunchMenu.createIterator();
while (iterator2.hasNext()) {
    MenuItem menuItem = iterator2.next();
}
```

java.util.Iterator 인터페이스를 사용한 Iterator 를 적용시켜보자.
```java
public interface Menu {
    public Iterator<MenuItem> createIterator();
}
```
ArrayList 컬렉션은 반복자를 리턴하는 iterator() 라는 메소드가 있음.
```java
public class PancakeHouseMenu implements Menu {
    ArrayList<MenuItem> menuItems;
    // 동일한 addItem, getMenuItems 메서드와 생성자
    @Override
    public Iterator<MenuItem> createIterator() {
        return menuItems.iterator();
    }   
}
```
```java
public class DinerMenu implements Menu {
    // 동일

    @Override
    public Iterator<MenuItem> createIterator() {
        return new DinerMenuIterator(menuItems);
    }      
}
```
Iterator 를 직접 implements 하여 구현
```java
public class DinerMenuIterator implements Iterator<MenuItem> {
    MenuItems[] list;
    int position = 0;
    
    public DinerMenuIterator(MenuItem[] list) {
        this.list = list;   
    }

    @Override
    public MenuItem next() {
        MenuItem menuItem = list[position];
        position += 1;
        return menuItem;
    }
    
    @Override
    public boolean hasNext() {
        if (position >= list.length || list[position] == null) return false;
        return true;
    }
    @Override
    public void remove() {
        if (position <= 0) 
            throw new IllegalStateException('next() 가 한번도 호출되지 않음.');
        if (list[position - 1] != null) {
            for (int i = position -1; i < (list.length - 1); i++) {
                list[i] = list[i + 1];
            }
            list[list.length - 1] = null;
        }
    }
}
```
```java
public class Waitress {
    ArrayList<Menu> menus;
    
    public Waitress(ArrayList<Menu> menus) {
        this.menus = menus;
    }
    public void printMenu () {
        Iterator menuIterator = menus.createIterator();
        while(menuIterator.hasNext()) {
            Menu menu = menuIterator.next();
            printMenu(menu);            
        }
    }  
    private void printMenu(Iterator<MenuItem> iterator) {
        while(iterator.hasNext()) {
            MenuItem menuItem = iterator.next();
            System.out.println(menuItem.getName());
            System.out.println(menuItem.getPrice());
            System.out.println(menuItem.getDescription());
        }
    } 
}
```
![image](https://user-images.githubusercontent.com/31977543/89864582-22714b80-dbe7-11ea-847e-df7f80ee755d.png)
팬케잌 메뉴와 디너 메뉴는 강제로 Iterator 를 반환하는 createIterator 메서드를 구현하여야 한다.
팬케잌은 createIterator 를 구현할 때, 
MenuItem 가 ArrayList 컬렉션이기 때문에 반복자를 리턴하는 iterator() 라는 메소드가 있다는 점을 이용하였고. 

디너 메뉴는 createIterator 를 구현할 때,
DinerMenuIterator 라는 Java 의 Iterator 를 직접 implement 하는 클래스를 만들어. 
그 안에서 next, hasNext, remove 등을 커스텀하여 구현하였다.

Waitress 는 무슨 메뉴든 생성자의 인자로 받을 수 있는 인터페이스를 가지고 있다.
그래서 팬케익이든 디너이든 팬케잌+디너 이든 생성자의 인자로 넘길 수 있다.

printMenu () 메서드는 펜케잌과 디너가 공통적으로 가지고 있는 createIterator 메서드를 호출하여 반복자 객체를 생성한다. 

```java
public class MenuTestDrive {
    public static void main(String args[]) {
        ArrayList<Menu> menuList = new ArrayList();
        menuList.add(new PancakgeHouseMenu());
        menuList.add(new DinerMenu());
    
        Waitress waitress = new Waitress(menuList);
        waitress.printMenu();
    }
}
```

어렵다. 내가 이해한 결론은 
1. 메뉴와 반복 메서드를 가지고 있는 객체를 만든다. 
2. 메뉴와 반복 메서드라는 동일한 인터페이스를 가지고 있으면, 공통적으로 통일된 행동을 하는 클래스(waitress)의 메서드들(재활용) 를 만들 수 있다.

JS 에서는 Iteration 프로토콜을 만족하면 spread, for..of 등을 사용할 수 있다. !

Reference
--
- https://jusungpark.tistory.com/25
