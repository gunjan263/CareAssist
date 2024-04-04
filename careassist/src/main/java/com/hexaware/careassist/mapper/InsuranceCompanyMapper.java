package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.InsuranceCompanyDto;
import com.hexaware.careassist.entity.InsuranceCompany;
import org.modelmapper.ModelMapper;

public class InsuranceCompanyMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    public static InsuranceCompanyDto toDto(InsuranceCompany company) {
        return modelMapper.map(company, InsuranceCompanyDto.class);
    }
    
    public static InsuranceCompany toEntity(InsuranceCompanyDto dto) {
        return modelMapper.map(dto, InsuranceCompany.class);
    }
}
