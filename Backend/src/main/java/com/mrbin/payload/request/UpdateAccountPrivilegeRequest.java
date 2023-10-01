package com.mrbin.payload.request;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.mrbin.models.EStates.EAccountState;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateAccountPrivilegeRequest {
    @JsonProperty("id")
    private String requestId;

    @JsonProperty("type")
    private String privilegeType;

    @JsonProperty("state")
    private EAccountState accountState;
}
