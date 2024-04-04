package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.PatientDto;
import com.hexaware.careassist.entity.Patient;
import org.modelmapper.ModelMapper;

public class PatientMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    public static PatientDto toDto(Patient patient) {
        return modelMapper.map(patient, PatientDto.class);
    }
    
    public static Patient toEntity(PatientDto dto) {
        return modelMapper.map(dto, Patient.class);
    }
}
