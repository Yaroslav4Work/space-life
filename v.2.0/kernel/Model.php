<?php

namespace kernel;
require 'DB.php';
use kernel\DB;


class Model
{
    public function __construct()
    {
        $this->name = explode('\\', str_replace('Model', '', get_class($this)))[1];
        $this->db = new DB('localhost', 'root', '', 'space_life');
        $this->table = strtolower($this->name);
    }

    public function select($what)
    {
        $query_result = $this->db->db_query('SELECT '.$what.' FROM '.$this->table);
        $all_results_arr = [];
        if($query_result) {
            while ($row = mysqli_fetch_assoc($query_result))
            {
                $all_results_arr[] = $row;
            }
        }

        return $all_results_arr;
    }

    public function insert($insert_assoc)
    {
        $insert_query = '';
        $insert_keys = '';
        foreach ($insert_assoc as $insert_assoc_key => $insert_assoc_value) {
            $insert_keys .= $insert_assoc_key.',';
            $insert_query .= $insert_assoc_value.',';
        }
        $insert_query = str_split($insert_query);
        unset($insert_query[count($insert_query) - 1]);
        $insert_query = implode('', $insert_query);
        $insert_query = explode(',', $insert_query);
        foreach ($insert_query as $key => $elem)
        {
            $insert_query[$key] = '"'.$elem.'"';
        }
        $insert_query = implode(',', $insert_query);
        $insert_keys = str_split($insert_keys);
        unset($insert_keys[count($insert_keys) - 1]);
        $insert_keys = implode('', $insert_keys);
        echo $insert_keys;
        return $this->db->db_query('INSERT INTO '.$this->table.'('.$insert_keys.') VALUES ('.$insert_query.')');
    }
}

