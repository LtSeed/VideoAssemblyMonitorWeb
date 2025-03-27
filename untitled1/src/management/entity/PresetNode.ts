import { PresetNodeId } from "./PresetNodeId";

export class PresetNode {
    name: string;
    id: PresetNodeId;
    realQuota: number;
    parents: PresetNode[];
    actions: string[];
    rank: number;

    constructor(name: string, id: PresetNodeId, quota: number, parents: PresetNode[], actions: string[] = [], rank: number = 0) {
        this.name = name;
        this.id = id;
        this.realQuota = quota;
        this.parents = parents;
        this.actions = actions;
        this.rank = rank;
    }

    toString(): string {
        return `PresetNode{name=${this.name}, id=${this.id.toString()}, quota=${this.realQuota}, parents=[${Array.from(this.parents).map(p => p.toString()).join(", ")}], actions=[${this.actions.join(", ")}]}`;
    }
}
