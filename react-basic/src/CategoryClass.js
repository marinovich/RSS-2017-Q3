import ItemClass from './ItemClass'

class CategoryClass {
    constructor(name, parent) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.isCompleted = true;
        this.items = [];
        this.name = name;
        this.children = [];
        this.parent = parent;
        this.childrenVisibility = true;
    }
}

export default CategoryClass;
