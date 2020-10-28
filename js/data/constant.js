
export const FOOTER_TAB = {
    SELECTED: "selected",
    ALL: "all",
    ACTIVE: "active",
    COMPLETED: "completed",
}

export const TODO_COMPLETE_CLASS = "completed";
export const TODO_EDIT_CLASS = "editing";

export const STORAGE_ID = "todoItems";

export const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com/api";

export const NOOP = () => {};


export class FooterTab {
    static SELECTED = "selected";
    static ALL = "all";
    static ACTIVE = "active";
    static COMPLETED = "completed";
}

export class Priorities {
    static FIRST = "FIRST"
    static SECOND = "SECOND"
    static NONE = "NONE";
}

export class HttpMethod {
    static GET = "GET";
    static POST = "POST";
    static PUT = "PUT";
    static DELETE = "DELETE";
}

export default { Priorities, FooterTab, HttpMethod ,NOOP, BASE_URL};


