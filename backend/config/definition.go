package config

import (
	"log"
	"strings"

	"github.com/spf13/viper"
)

type Config struct {
	Database `yaml:"db"`
	Cors     `yaml:"cors"`
	Jwt      `yaml:"jwt"`
	Port     uint   `yaml:"port"`
	Hostname string `yaml:"hostname"`
}

type Database struct {
	Hostname string `yaml:"hostname"`
	Port     uint   `yaml:"port"`
	Name     string `yaml:"name"`
	Username string `yaml:"username"`
	Password string `yaml:"password"`
}

type Cors struct {
	Allow struct {
		Origin string `yaml:"origin"`
	} `yaml:"allow"`
}

type Jwt struct {
	Secret string `yaml:"secret"`
	Issuer string `yaml:"issuer"`
}

func Load() *Config {
	v := viper.New()
	v.SetConfigName("config")
	v.SetConfigType("yaml")

	v.AddConfigPath("./config")
	v.AddConfigPath("../config")
	v.AddConfigPath("../../config")
	v.AddConfigPath("/myapp/app/config")
	v.AddConfigPath("/myapp/config")

	v.AutomaticEnv()

	v.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	err := v.ReadInConfig()
	if err != nil {
		log.Fatalln(err)
	}

	var conf *Config

	err = v.Unmarshal(&conf)
	if err != nil {
		log.Fatalln(err)
	}

	return conf
}
