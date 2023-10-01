package com.mrbin.repository;

import com.mrbin.models.EStates.EAccountState;
import com.mrbin.models.Recycler;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecyclerRepository extends MongoRepository<Recycler, String> {
    List<Recycler> findAllByAccountState(EAccountState state);
}
