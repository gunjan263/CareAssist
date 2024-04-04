package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.AdministratorDto;
import com.hexaware.careassist.entity.Administrator;
import org.modelmapper.ModelMapper;

public class AdministratorMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    public static AdministratorDto toDto(Administrator administrator) {
        return modelMapper.map(administrator, AdministratorDto.class);
    }
    
    public static Administrator toEntity(AdministratorDto dto) {
        return modelMapper.map(dto, Administrator.class);
    }
}
