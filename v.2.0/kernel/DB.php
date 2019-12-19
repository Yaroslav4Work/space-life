<?php

namespace kernel;

class DB
{
    public function __construct($db_host, $name, $password, $db_name)
    {
        $this->db_host = $db_host;
        $this->name = $name;
        $this->password = $password;
        $this->db_name = $db_name;
    }

    public function db_query($query)
    {
        $db = mysqli_connect($this->db_host, $this->name, $this->password, $this->db_name);
        $query_result = $db->query($query);
        $db->close();
        return $query_result;
    }
}