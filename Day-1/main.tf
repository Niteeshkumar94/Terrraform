provider "aws" {
  region = "ap-southeast-2"
}

resource "aws_instance" "name1" {
  ami           = "ami-0c73bd9145b5546f5"
  instance_type = "t3.micro"
  key_name      = "ec2"

  tags = {
    Name = "my-ec2-instance"
  }
}

output "instance_id" { value = aws_instance.name1.id }
output "public_ip"   { value = aws_instance.name1.public_ip }
output "public_dns"  { value = aws_instance.name1.public_dns }