import { PresetNodeId } from "./PresetNodeId";

export class PresetNode {
    name: string;
    id: PresetNodeId;
    real_quota: number;
    parents: PresetNode[];
    actions: string[];
    rank: number;

    constructor(name: string, id: PresetNodeId, quota: number, parents: PresetNode[], actions: string[] = [], rank: number = 0) {
        this.name = name;
        this.id = id;
        this.real_quota = quota;
        this.parents = parents;
        this.actions = actions;
        this.rank = rank;
    }

    toString(): string {
        return `PresetNode{name=${this.name}, id=${this.id.toString()}, quota=${this.real_quota}, parents=[${Array.from(this.parents).map(p => p.toString()).join(", ")}], actions=[${this.actions.join(", ")}]}`;
    }
}
