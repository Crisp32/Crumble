/**
 * Crumble Server Main Utility File
 * @author Connell Reffo
 */

import Player from "./gameobjects/player";
import Rocket from "./gameobjects/rocket";

/**
 * Maximum Length for Player Name
 */
export const MAX_NAME_LENGTH = 16;

/**
 * The Maximum Amount of Games that can be Concurrently Running
 */
export const MAX_ACTIVE_GAMES = 5;

/**
 * The Maximum Value for a Rocket's Lifetime Variable before Self Destruction
 */
export const MAX_ROCKET_LIFETIME = 20;

/**
 * Movement Speed of Players
 */
export const PLAYER_SPEED = 10;

/**
 * Speed of a Rocket Projectile
 */
export const ROCKET_SPEED = 20;

/**
 * Offset of Chunk Hitbox Width
 */
export const CHUNK_WIDTH_OFFSET = 45;

/**
 * Offset of Chunk Hitbox Height and Vertical Position
 */
export const CHUNK_HEIGHT_OFFSET = 35;

/**
 * Size of a Chunk in Tiles
 */
export const CHUNK_SIZE = 4;

/**
 * Defines the Hitbox Size of a Map Chunk
 */
export const TOTAL_CHUNK_SIZE = 230;

/**
 * Size of a Tile
 */
export const TILE_SIZE = TOTAL_CHUNK_SIZE / CHUNK_SIZE;

/**
 * Warning Time Before a Tile Destroys
 */
export const TILE_DESTROY_WARNING_MS = 1500;

/**
 * Cooldown Time Between Rockets being Fires by a Single Player
 */
export const SHOOT_COOLDOWN_MS = 1300;

/**
 * Amount of Ticks Between Tile Destruction
 */
export const DESTROY_TILE_TICKS = 130;

/**
 * Amount of Ticks Between Rocket Projectile Position Updates
 */
export const ROCKET_UPDATE_TICKS = 1;

/**
 * How Often Code in the Game Tick Function is Called
 */
export const TICK_MS = 100;

/**
 * Force of Knockback from Handrocket Shot
 */
export const HANDROCKET_KNOCKBACK_FORCE = 4;

/**
 * Port that the Main Crumble Server will Run on
 */
export const PORT = 8000;

/**
 * Dimensions of a Destroyed Tile's Hitbox
 */
export const TILE_DIMENSIONS = {
    width: 13,
    height: 3
}

/**
 * Defines the Dimension of a Player on the Server Side
 */
export const PLAYER_DIMENSIONS = {
    width: 42,
    height: 70
}

/**
 * Enumeration of Events that Will Take Place on a Socket Server
 */
export enum SocketEvents {
    CONNECTION = "connection",
    DISCONNECT = "disconnect",
    PLAYER_LEAVE = "leave",
    REGISTER = "register",
    START_GAME = "startgame",
    SEND_ID = "id"
}

/**
 * Enumeration of Events that Will Take Place on the Game's Server
 */
export enum GameEvents {
    PLAYER_MOVE = "playermove",
    PLAYER_DIED = "playerdied",
    PLAYER_WON = "playerwon",
    TILE_DESTROYED = "tiledestroyed",
    ANGLE_CHANGE = "anglechange",
    ROCKET_SHOT = "rocketshot",
    ROCKET_EXPLODE = "rocketexplode"
}

/**
 * Represents Possible Angles the Handrocket Can be Pointed At
 */
export enum HandrocketAngles {
    UP = "up",
    MIDDLE = "middle",
    DOWN = "down"
}

/**
 * Enumeration of Directions the Player can Face
 */
export enum FacingDirections {
    LEFT = "left",
    RIGHT = "right"
}

/**
 * Enumeration of Possible Directions a Player can Move in
 */
export enum Directions {
    UP = "up",
    DOWN = "down",
    LEFT = "left",
    RIGHT = "right"
}

/**
 * Represents a Connected Player Object
 */
export interface IConnectedPlayer {
    [socketId: string]: Player
}

/**
 * Represents a Rocket Projectile Object
 */
export interface IProjectile {
    [instanceId: string]: Rocket
}

/**
 * Represents Obstruction Data Used to When the Player is Off the Map Boundries
 */
export interface IPlayerObstructionData {
    withinMap: boolean,
    onFront: boolean
}

/**
 * Represents Data Required for a Crumble Level
 */
export interface ILevelMap {
    chunks: Array<Vec2>,
    destroyedTiles: Array<Vec2>
}

/**
 * Represents Player Angle and Directional Data from a Client
 */
export interface IAngleChangeData {
    angle: HandrocketAngles,
    direction: FacingDirections
}

/**
 * Generates a Random Integer in a Range
 * @param min Minimum Value of Output
 * @param max Maximum Value of Output
 */
export function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Represents a 2D Position
 */
export class Vec2 {
    public x: number;
    public y: number;

    public static zero = new Vec2(0, 0);

    /**
     * @param x X Position
     * @param y Y Position
     */
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    /**
     * Generates a Random 2D Position
     */
    public static random(min: number, max: number): Vec2 {
        return new Vec2(randomInt(min, max), randomInt(min, max));
    }
}

/**
 * Test
 */
export const TEST_MAP: ILevelMap = {
    chunks: [
        new Vec2(0, 0),
        new Vec2(1, 0),
        new Vec2(2, -1),
        new Vec2(1, -1),
        new Vec2(0, -1),
        new Vec2(-1, -1)
    ],
    destroyedTiles: []
};