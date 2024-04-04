package com.hexaware.careassist.mapper;

import com.hexaware.careassist.dto.InvoiceDto;
import com.hexaware.careassist.entity.Invoice;
import org.modelmapper.ModelMapper;

public class InvoiceMapper {
    private static final ModelMapper modelMapper = new ModelMapper();
    
    public static InvoiceDto toDto(Invoice invoice) {
        return modelMapper.map(invoice, InvoiceDto.class);
    }
    
    public static Invoice toEntity(InvoiceDto dto) {
        return modelMapper.map(dto, Invoice.class);
    }
}
