package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.HealthcareProviderDto;
import com.hexaware.careassist.entity.HealthcareProvider;
import org.modelmapper.ModelMapper;

public class HealthcareProviderMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    public static HealthcareProviderDto toDto(HealthcareProvider provider) {
        return modelMapper.map(provider, HealthcareProviderDto.class);
    }
    
    public static HealthcareProvider toEntity(HealthcareProviderDto dto) {
        return modelMapper.map(dto, HealthcareProvider.class);
    }
}
