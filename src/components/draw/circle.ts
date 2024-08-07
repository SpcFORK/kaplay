import { getKaboomContext } from "../../kaboom";
import { Rect, Vec2 } from "../../math";
import type { Comp, GameObj } from "../../types";
import type { AnchorComp } from "../transform/anchor";
import type { outline } from "./outline";

/**
 * The {@link circle `circle()`} component.
 *
 * @group Component Types
 */
export interface CircleComp extends Comp {
    draw: Comp["draw"];
    /** Radius of circle. */
    radius: number;
    /**
     * Render area of the circle.
     *
     * @since v3000.0
     */
    renderArea(): Rect;
    /**
     * Center of circle
     */
    center(): Vec2;
}

/**
 * Options for the {@link circle `circle()``} component.
 *
 * @group Component Types
 */
export interface CircleCompOpt {
    /**
     * If fill the circle (useful if you only want to render outline with
     * {@link outline `outline()`} component).
     */
    fill?: boolean;
}

export function circle(radius: number, opt: CircleCompOpt = {}): CircleComp {
    const k = getKaboomContext(this);
    const { getRenderProps } = k._k;

    return {
        id: "circle",
        radius: radius,
        draw(this: GameObj<CircleComp>) {
            k.drawCircle(Object.assign(getRenderProps(this), {
                radius: this.radius,
                fill: opt.fill,
            }));
        },
        renderArea(this: GameObj<AnchorComp | CircleComp>) {
            return new Rect(
                new Vec2(this.anchor ? 0 : -this.radius),
                this.radius * 2,
                this.radius * 2,
            );
        },
        center() {
            return new Vec2(this.radius, this.radius)
        },
        inspect() {
            return `radius: ${Math.ceil(this.radius)}`;
        },
    };
}
