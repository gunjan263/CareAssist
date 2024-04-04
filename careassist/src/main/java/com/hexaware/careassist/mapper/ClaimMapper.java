//package com.hexaware.careassist.mapper;
//
//import com.hexaware.careassist.dto.ClaimDto;
//import com.hexaware.careassist.entity.Claim;
//import org.modelmapper.ModelMapper;
//
//public class ClaimMapper {
//    private static final ModelMapper modelMapper = new ModelMapper();
//    
//    public static ClaimDto toDto(Claim claim) {
//        return modelMapper.map(claim, ClaimDto.class);
//    }
//    
//    
//    
//    public static Claim toEntity(ClaimDto dto) {
//        return modelMapper.map(dto, Claim.class);
//    }
//}

package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.ClaimDto;
import com.hexaware.careassist.entity.Claim;
import com.hexaware.careassist.entity.Patient;
import com.hexaware.careassist.entity.InsuranceCompany;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;

public class ClaimMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    static {
        modelMapper.addMappings(new PropertyMap<Claim, ClaimDto>() {
            protected void configure() {
                map().setPatientId(source.getPatient().getPatientId());
                map().setCompanyId(source.getInsuranceCompany().getCompanyId());
            }
        });
    }
    
    public static ClaimDto toDto(Claim claim) {
        return modelMapper.map(claim, ClaimDto.class);
    }
    
    public static Claim toEntity(ClaimDto dto) {
        return modelMapper.map(dto, Claim.class);
    }
}
