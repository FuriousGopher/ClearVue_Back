import { createMeterDTO, updateMeterDTO } from '../types/types';
import { CustomerRepository } from '../repositories/customer.repository';
import { MeterRepository } from '../repositories/meter.repository';
import { SiteRepository } from '../repositories/site.repository';

export class MeterService {
  static async newMeter(createMeterDTO: createMeterDTO) {
    const checkIfExist = await MeterRepository.findOneByName(
      createMeterDTO.name,
    );
    if (checkIfExist) {
      throw new Error(`Meter already exists`);
    }
    const findSite = await SiteRepository.findOneById(createMeterDTO.siteId);
    if (!findSite) {
      throw new Error(`Site not found`);
    }
    return await MeterRepository.save(createMeterDTO, findSite);
  }

  static async updateMeter(updateMeterDTO: updateMeterDTO) {
    const foundMeter = await MeterRepository.findOneById(updateMeterDTO.id);
    if (!foundMeter) {
      throw new Error(`Meter not found`);
    }
    return await MeterRepository.update(updateMeterDTO, foundMeter);
  }
}
