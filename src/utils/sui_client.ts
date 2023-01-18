
import { JsonRpcProvider, ObjectId, GetObjectDataResponse, SuiAddress, ObjectStatus } from "@mysten/sui.js"
import {
  Infer,
  number,
  object,
  string,
} from 'superstruct';

export const BalanceObject = object({
  coinType: string(),
  coinObjectCount: number(),
  totalBalance: number(),
  lockedBalance: object()
});

export type BalanceObject = Infer<typeof BalanceObject>;

export class JRProvider extends JsonRpcProvider {
  // Objects
  async getDynamicFieldObject(
    parent_object_id: ObjectId,
    name: string,
  ): Promise<GetObjectDataResponse> {
    try {
      return await this.client.requestWithType(
        'sui_getDynamicFieldObject',
        [parent_object_id, name],
        GetObjectDataResponse,
        // skipDataValidation
        true
      );
    } catch (err) {
      throw new Error(
        `Error fetching owned object: ${err} for object ${parent_object_id} and name ${name}`
      );
    }
  }

  async getBalance(
    owner: SuiAddress,
    coin_type: string,
  ): Promise<GetObjectDataResponse> {
    try {
      return await this.client.requestWithType(
        'sui_getBalance',
        [owner, coin_type],
        GetObjectDataResponse,
        // skipDataValidation
        true
      );
    } catch (err) {
      throw new Error(
        `Error fetching balance object: ${err} for owner ${owner} and coin_type ${coin_type}`
      );
    }
  }
}