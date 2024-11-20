@echo off
echo Creando DB e insertando datos...
@"C:\Program Files\PostgreSQL\17\pgAdmin 4\runtime\psql.exe" -h localhost -d postgres -U postgres -p 5432 -a -q -f ./scriptdb.sql
@pause