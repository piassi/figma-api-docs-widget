export type MenuOptionHandler = (propertyValue?: string) => void;

export type MenuOption = WidgetPropertyMenuItem & {
  handler: MenuOptionHandler;
};

export type Feature<T> = {
  state: T;
  menuOptions: MenuOption[];
};