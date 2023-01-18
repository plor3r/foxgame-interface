
import { JsonRpcProvider, ObjectId, GetObjectDataResponse } from "@mysten/sui.js"


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
}