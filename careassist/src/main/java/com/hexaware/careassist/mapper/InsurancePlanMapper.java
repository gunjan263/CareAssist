package com.hexaware.careassist.mapper;

import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import com.hexaware.careassist.dto.InsurancePlanDto;
import com.hexaware.careassist.entity.InsurancePlan;

public class InsurancePlanMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    static {
        // Define a property map to specify explicit mappings
        PropertyMap<InsurancePlan, InsurancePlanDto> planMap = new PropertyMap<>() {
            protected void configure() {
                // Map companyId from insuranceCompany to companyId in InsurancePlanDto
                map().setCompanyId(source.getInsuranceCompany().getCompanyId());
                // Map companyName from insuranceCompany to companyName in InsurancePlanDto
                map().setCompanyName(source.getInsuranceCompany().getCompanyName());
            }
        };
        // Add the property map to ModelMapper
        modelMapper.addMappings(planMap);
    }
    
    public static InsurancePlanDto toDto(InsurancePlan insurancePlan) {
        return modelMapper.map(insurancePlan, InsurancePlanDto.class);
    }
    
    public static InsurancePlan toEntity(InsurancePlanDto dto) {
        return modelMapper.map(dto, InsurancePlan.class);
    }
}